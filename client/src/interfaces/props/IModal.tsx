export default interface IModalProps {
  open: boolean,
  setOpen: Function,
  title: 'Followings' | 'Followers' |'Blocked'
  url: string
  handleClose: () => void
}
