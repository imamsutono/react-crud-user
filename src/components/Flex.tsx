import { CSSProperties, FC, ReactNode } from 'react'

type JustifyContent = 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
type AlignItems = 'stretch' | 'center' | 'start' | 'end'

interface IProps {
  children: ReactNode;
  justify?: JustifyContent;
  align?: AlignItems;
}

const styles: CSSProperties = {
  display: 'flex',
}

const Flex: FC<IProps> = ({ children, justify, align }) => {
  const justifyContent: string = justify || 'unset'
  const alignItems: string = align || 'unset'

  return (
    <div style={{ ...styles, justifyContent, alignItems }}>
      {children}
    </div>
  )
}

export default Flex
