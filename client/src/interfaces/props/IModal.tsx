export default interface IModalProps {
  open: boolean,
  setOpen: Function,
  title: 'Followings' | 'Followers' |'Blocked'
  url: string
  button:string
  handleClose: () => void
  action:Function
}
