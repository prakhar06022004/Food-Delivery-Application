function CartItemsCard({ data }) {
  return (
    <>
      <div className="flex w-full justify-center gap-5 border p-2">
        <div className="flex gap-2">
          <div>
            {data?.image && <img src={data?.image} className="w-30 h-30" />}
          </div>
          <div>
            <div>{data?.name}</div>
            <div>{data?.price}</div>
            <div>{data?.foodType}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItemsCard;
