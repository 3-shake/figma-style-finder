import { VFC } from 'react'

export const TargetIcon: VFC<{
  width?: number,
  height?: number,
  onClick?: () => void
}> = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    { /* eslint-disable-next-line max-len */ }
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 14V11.0247C13.1378 11.2592 11.2592 13.1378 11.0247 15.5H14L14 16.5H11.0247C11.2592 18.8622 13.1378 20.7408 15.5 20.9753V18H16.5V20.9753C18.8622 20.7408 20.7408 18.8622 20.9753 16.5H18V15.5H20.9753C20.7408 13.1378 18.8622 11.2592 16.5 11.0247V14H15.5ZM21.9794 15.5C21.739 12.5851 19.4149 10.261 16.5 10.0205V8H15.5V10.0205C12.5851 10.261 10.261 12.5851 10.0205 15.5H8V16.5H10.0205C10.261 19.4149 12.5851 21.739 15.5 21.9795V24H16.5V21.9795C19.4149 21.739 21.739 19.4149 21.9794 16.5H24V15.5H21.9794Z" fill="black"/>
  </svg>
)
