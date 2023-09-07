export function addUserDetailsPersist(Auth, dispatch, response){
    const {fullname, email, password, avatar, gender, username, _id,followers,following,saved}=response
    const data = {fullname, email, password, avatar, gender, username, _id,followers,following,saved}
    dispatch(Auth(data));
}