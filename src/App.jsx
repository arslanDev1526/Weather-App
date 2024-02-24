import{ useState } from "react";
import { ApiCall } from "./components/apicall";

function App() {
const[photoData, setPhotoData] = useState(null);

  return (
    <>
    <div className="blurred-img">
    <div
        className="app-container"
        style={{
          backgroundImage: `url(${photoData && photoData.results.length > 0 ? photoData.results[0].urls.full : ''})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
           <ApiCall setPhotoData={setPhotoData}  />

      </div>
    </div>
   


    </>
  );
}

export default App;
