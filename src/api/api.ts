export const BASE_URL = 'https://dogsapi.origamid.dev/json'

type TokenPostType = {
  username: string
  password: string
}

type PostUserType = Required<TokenPostType> & {
  email: string
}

type Return_Type_const_Post_Photo = {
  url: string
  options: {
    method: string
    headers: {
      [key: string]: string
    }
    body: any
  }
}

type Type_const_Post_Photo = (
  formData: FormData,
  token: string,
) => Return_Type_const_Post_Photo

type Type_const_Post_Comment = (
  id: number,
  comment: {[key: string]: string},
) => Return_Type_const_Post_Photo


type Type_Param = {
    page: number
    total: number
    user: string
  }
  
  type Return_Type_const_Get_Photo = {
    url: string
    options: {
      method: string
      cache: string
      headers: {
        [key: string]: string
      }
    }
  }
  
  type Type_GET_PHOTOS = ({
    page,
    total,
    user,
  }: Type_Param) => Return_Type_const_Get_Photo

  type Type_Return_Get_Photo = {
    url:string,
    options: {
      method: string,
      cache: string,
      headers: {       [key: string]: string },
    },
  }

type Type_GET_PHOTO = ({id}: {id: number}) => Type_Return_Get_Photo

export const TOKEN_POST = (body: TokenPostType) => {
  return {
    url: `${BASE_URL}/jwt-auth/v1/token`,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body }),
    },
  }
}

export const TOKEN_VALIDATE_POST = (token: string) => {
  return {
    url: `${BASE_URL}/jwt-auth/v1/token/validate`,
    options: {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    },
  }
}

export const GET_USER = (token: string) => {
  return {
    url: `${BASE_URL}/api/user`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }
}

export const POST_USER = (body: PostUserType) => {
  return {
    url: `${BASE_URL}/api/user`,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  }
}

export const POST_PHOTO: Type_const_Post_Photo = (formData, token) => {
  return {
    url: `${BASE_URL}/api/photo`,
    options: {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    },
  }
}


export const GET_PHOTOS: Type_GET_PHOTOS = ({ page, total, user }) => ({
  url: `${BASE_URL}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
  options: {
    method: 'GET',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  },
})



export const GET_PHOTO: Type_GET_PHOTO = ({ id }) => ({
    url: `${BASE_URL}/api/photo/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    },
  })

  
  export const POST_COMMENTS: Type_const_Post_Comment = (id, body) => {
    return {
      url: `${BASE_URL}/api/comment/${id}`,
      options: {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
       },
        body: JSON.stringify(body),
      },
    }
  }

  export const DELELE_PHOTO = (id: number) => ({ 
    url: `${BASE_URL}/api/photo/${id}`,
    options: {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`
     },
    },
  })