export const AlertBox = ({ uploadingProgress }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-5 w-80">
        {uploadingProgress < 100 ? (
          <span>Uploading in Progress</span>
        ) : (
          <span>Upload Complete</span>
        )}
        <span>{uploadingProgress + " %"}</span>
      </div>
    </>
  );
};
