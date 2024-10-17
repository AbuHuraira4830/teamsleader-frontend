const AddContentBlock = ({ title, icon }) => {
  return (
    <div className=" flex flex-col gap-2 items-center justify-center">
      <span className="">{icon}</span>
      <span className="">{title}</span>
    </div>
  );
};

export default AddContentBlock;
