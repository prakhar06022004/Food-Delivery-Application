
const OwnerShopItem = ({data}) => {
  return (
    <>
    <div>{data?.name}</div>
        <div>{data?.price}</div>
    <div>{data?.foodType}</div>
        <div>{data?.category}</div>
    <div><img src={data?.image} alt={data?.name} className="w-20 h-20 object-cover rounded"/></div>

    
</>
  )
}

export default OwnerShopItem