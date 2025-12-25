## Signup & login pages

### Created front-end routes

Packages needed: `tailwindcss` + `daisyui`.

**tailwindcss**: CSS framework.
**daisyui**: Tailwind CSS plugin that adds pre-built UI components and themes.

### Created front-end routes

Packages needed: `react-router-dom`.
**react-router-dom** just links a React component with an URL path, so that we can make a frontend router.

### Connected front-end with back-end

Packages needed: `axios` + `cros` + `zustand`.
**axios** client object used to send http requests to the backend.
**cros** to fix the cross-origin problem.
**zustand** to create a global state that we can share easly to multiple components.

1. On each refresh, i send a get request from the useEffect() hook to "/api/auth/check" route.
>useEffect is a state i created using zustand to call this hook from any react component easly.

2. then the `protectRoute` middleware from the backend is called the check if there is valide user sending the request by checking the jwt from the request `Cookie` header.

3. 
    if the jwt token is valide we send back to the front req.user
    else a throw is catched and we know that there is no user.


### 