import { CSSProperties, FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode;
}

const containerStyle: CSSProperties = {
  padding: 20
}

const Container: FC<IProps> = ({ children }) => (
  <div style={containerStyle}>
    {children}
  </div>
)

export default Container
