type PostDetailItemProps = {
    label: string
    data: string
}
export default function PostDetailItem({label, data} : PostDetailItemProps) {
  return (
    <p className="font-bold mb-3 text-gray-700 uppercase">{label}: {''}
        <span className="font-normal normal-case">{data}</span>
    </p>
  )
}
