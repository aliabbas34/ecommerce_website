import React from 'react';
import { API } from '../../backend';




const ImageHelper=({ product })=>{
    
    return(
        <div className="rounded border border-success p-2">
            <img
              src={product ? `${API}/product/photo/${product._id}`:`https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
        </div>
    );
};

export default ImageHelper;