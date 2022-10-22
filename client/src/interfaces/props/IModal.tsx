export default interface IModalProps {
  open: boolean,
  title: 'Following' | 'Followers' |'Blocked'
  url: string
  handleClose: () => void
}
