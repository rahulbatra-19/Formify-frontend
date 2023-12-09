import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";

export default function Loader() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "90vh" }}
    >
      <ReactLoading type={"bars"} color={"#06367a"} height={100} width={100} />
    </div>
  );
}
