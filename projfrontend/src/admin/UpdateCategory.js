import React, { useState,useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateCategory, getCategory } from './helper/adminapicall';

const UpdateCategory = ({match}) =>{

    
    const {user,token}=isAuthenticated();
    const [name, setName]=useState("");
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
    const [empty,setEmpty]=useState(false);



    const emptyMessage=()=>{
        if(empty){
            return <h4 className='text-warning'>Field Empty!</h4>
        }
    }

    const successMessage=()=>{
        if(success){
            return <h4 className="text-success">Category updated successfully</h4>
        }
    }

    const warningMessage=()=>{
        if(error){
            return <h4 className="text-success">Failed to update category</h4>
        }
    }
    const goBack=()=>(
        <div className="mt-5">
            <Link className='btn btn-sm btn-success mb-3' to='/admin/dashboard'>
                Admin Home
            </Link>
        </div>
    );


        const handleChange=event=>{
            // setError("");
            setName(event.target.value)
        };

        const onSubmit=(event)=>{
            event.preventDefault();
            // setError("");
            setSuccess(false);
            if(name===""){
                setEmpty(true);
            } else{
            updateCategory(match.params.categoryId, user._id,token,{name})
            .then(data=>{
                if(data.error){
                    setError(true);
                } else{
                    setError(false);
                    setSuccess(true);
                    setName("");
                    setEmpty(false);
                }
            })
        }
        }
   

   

    


    

    const myCategoryForm=()=>(
        <form>
            <div className="form-group">
                <p className="lead">Enter new category name</p>
                <input type="text" 
                    className='form-control my-3'
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder='For ex. Summer'
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Update category</button>
            </div>
        </form>
    );

    return(
        <Base
        title='Update category name here'
        description='Give the current category a new name'
        className='container bg-info p-4'
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                {successMessage()}
                {warningMessage()}
                {emptyMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateCategory;