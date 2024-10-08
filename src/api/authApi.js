const loginApi = async (code, option) => {
    const res = await fetch(`${import.meta.env.VITE_APP_AUTH_API_URL}/api/auth/admin-${option}-login?code=${decodeURIComponent(code)}`);

    if (!res.ok) {
        const message = (await res.json()).message;
        throw new Error(message);
    }

    return res.json();
};


const reissueApi = async (refreshToken) => {
    const res = await fetch(`${import.meta.env.VITE_APP_AUTH_API_URL}/api/auth/login`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + refreshToken,
      },
    });
  
    if (!res.ok) {
      const message = (await res.json()).message;
      throw new Error(message);
    }
  
    return res.json();
  };
  
  export { loginApi, reissueApi };