import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";

function Error() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <Puff
          visible={true}
          height="80"
          width="80"
          color="#ac87c5"
          ariaLabel="puff-loading"
          wrapperClass="flex-center-full loader"
        />
      ) : (
        <>
          <div className=".flex-center-full">
            {" "}
            <h1 style={{ textAlign: "center", marginTop: "20%" }}>
              Page Not Found 404
            </h1>
          </div>
        </>
      )}
    </>
  );
}

export default Error;
