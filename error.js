export const createError = (status , mssg) =>{
    const e = new Error();
    e.status = status;
    e.message = mssg
    return e
}