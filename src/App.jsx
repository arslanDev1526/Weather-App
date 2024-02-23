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
          backgroundImage: `url(${photoData && photoData.results.length > 0 ? photoData.results[0].urls.full : 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzA1NTV8MHwxfHNlYXJjaHwyfHxsb25kb258ZW58MHx8fHwxNzA4NjczNjExfDA&ixlib=rb-4.0.3&q=80&w=1080'})`,
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
