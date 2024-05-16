import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const SuccessCircle = (props: SvgProps) => (
  <Svg
    width={82}
    height={83}
    fill="none"
    viewBox="0 0 82 83"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" fillOpacity={0.01} d="M82 .372H0v82h82v-82Z" />
      <Path
        fill="#50BD62"
        stroke="#34A446"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={5}
        d="m41 7.205 8.974 6.546 11.109-.02 3.412 10.57 9 6.513-3.454 10.558 3.453 10.558-8.999 6.512-3.413 10.57-11.108-.02L41 75.538l-8.975-6.546-11.108.02-3.412-10.57-9-6.512 3.453-10.558-3.453-10.558 9-6.513 3.412-10.57 11.108.02L41 7.205Z"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={5}
        d="m29.041 41.372 8.542 8.541L54.667 32.83"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .372h82v82H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SuccessCircle
