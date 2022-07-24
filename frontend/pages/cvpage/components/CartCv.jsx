
const CartCv = () => {
    return (
        <>
            <form >
                <div class="form-group">
                    <label for="formGroupExampleInput">Title</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder={title} />
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Description</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder={description} />
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Price</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder={price} />
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Location</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder={location} />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Cv file</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1"placeholder={images}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default CartCv;


