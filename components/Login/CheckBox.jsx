import React, { useState, useEffect } from "react"
import { Text, StyleSheet, textColor, style } from "react-native"
import { Chip } from "react-native-paper"

const CheckBox = book => {
  const { chipKey, value, chipPressed, sel } = book

  const [selected, setSelected] = useState(false)
  const [textColor, setTextColor] = useState(`#47D3AB`)
  const [style, setStyle] = useState({
    borderColor: `#47D3AB`,
    backgroundColor: `white`,
  })

  useEffect(() => {
    if (selected) {
      setTextColor(`white`)
      setStyle({
        borderColor: `#47D3AB`,
        backgroundColor: `#47D3AB`,
        margin: 5,
      })
    } else {
      setTextColor(`black`)
      setStyle({
        borderColor: `#47D3AB`,
        backgroundColor: `transparent`,
        borderWidth: 2,
        margin: 5,
      })
    }
  }, [selected])

  const handlePress = () => {
    setSelected(!selected)
    if (chipPressed) {
      chipPressed(selected)
    }
  }

  return (
    <Chip
      mode="outlined"
      style={style}
      selected={selected}
      selectedColor={textColor}
      onPress={handlePress}>
      <Text>{book.book}</Text>
    </Chip>
  )
}

export default CheckBox

const styles = StyleSheet.create({
  Chip: {},
})
