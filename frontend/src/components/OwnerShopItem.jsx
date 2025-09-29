const OwnerShopItem = ({ data }) => {
  return (
    <>
      <div className="flex w-full max-w-lg shadow-lg overflow-hidden">
        <div className="flex relative gap-5">
          <img
            src={data?.image}
            alt={data?.name}
            className="w-20 h-20 object-cover rounded border"
          />{" "}
          <div className="">
            <p>{data?.name}</p>
            <p>Category: {data?.category}</p>
            <p>Food Type: {data?.foodType}</p>
            <p>Price: {data?.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerShopItem;
