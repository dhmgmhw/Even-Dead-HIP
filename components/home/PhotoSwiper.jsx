import React, { useRef, useState, useEffect } from 'react';
import Carousel, {
  ParallaxImage,
  Pagination,
} from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import ImageBlurLoading from 'react-native-image-blur-loading';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;
const { width: screenWidth } = Dimensions.get('window');

export default function PhotoSwiper({ detailData }) {
  const [entries, setEntries] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [innerImg, setInnerImg] = useState();
  const [visible, setVisible] = useState(false);

  const carouselRef = useRef(null);

  const ENTRIES1 = [
    {
      image: detailData.image,
    },
  ];

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const setImages = () => {
    for (let i = 0; i < detailData.captureImages.length; i++) {
      ENTRIES1.push({ image: detailData.captureImages[i] });
    }
    setEntries(ENTRIES1);
  };

  useEffect(() => {
    setImages();
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <Pressable
        onPress={() => {
          console.log(item);
          toggleOverlay();
          setInnerImg(item.image);
        }}
        style={styles.item}>
        <ParallaxImage
          source={{ uri: item.image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <ImageBlurLoading
            style={styles.overlayImage}
            resizeMode='contain'
            source={{ uri: innerImg }}
            thumbnailSource={{ uri: innerImg }}
            withIndicator
          />
        </Overlay>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        containerStyle={styles.paginationContainer}
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#438732',
        }}
        inactiveDotStyle={{
          backgroundColor: 'white',
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 300,
    width: 210,
    marginVertical: 20,
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationContainer: {
    paddingTop: 0,
    paddingBottom: 25,
  },
  overlayImage: {
    height: diviceWidth + 100,
    width: diviceWidth,
  },
});
