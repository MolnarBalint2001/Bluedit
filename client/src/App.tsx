import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "./config/routes.ts";
import {lazy, Suspense} from "react";
import Layout from "./components/Layout/Layout.tsx";
import 'primeicons/primeicons.css';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {ProgressSpinner} from "primereact/progressspinner";
import Account from "./pages/Account/Account.tsx";
import {QueryClient, QueryClientProvider} from "react-query";


const SignIn = lazy(() => import("./pages/SignIn/SignIn.tsx"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp.tsx"));
const Posts = lazy(() => import("./pages/Posts/Posts.tsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.tsx"));
const Forbidden = lazy(() => import("./pages/Forbidden/Forbidden.tsx"));
const ManageAccount = lazy(() => import("./pages/ManageAccount/ManageAccount.tsx"));
const NewPost = lazy(() => import("./pages/NewPost/NewPost.tsx"));
const Post = lazy(() => import("./pages/Post/Post.tsx"));
const Accounts = lazy(() => import("./pages/Accounts/Accounts.tsx"));
const VersionInformation = lazy(() => import("./pages/VersionInformation/VersionInformation.tsx"));


const queryClient = new QueryClient();

function App() {


    return (
        <>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Suspense fallback={<div className={"w-full flex justify-center"}><ProgressSpinner
                            className={"mt-5"}/></div>}>
                            <Routes>

                                <Route element={<ProtectedRoute/>}>
                                    <Route path={"/"} element={<Layout/>}>
                                        <Route path={routes.posts} element={<Posts/>}/>
                                        <Route path={routes.manageAccount} element={<ManageAccount/>}/>
                                        <Route path={routes.accounts + "/:id"} element={<Account/>}/>
                                        <Route path={routes.newPost} element={<NewPost/>}/>
                                        <Route path={routes.post + "/:id"} element={<Post/>}/>
                                        <Route path={routes.accounts} element={<Accounts/>}/>
                                        <Route path={routes.versionInformation} element={<VersionInformation/>}/>
                                    </Route>
                                </Route>

                                <Route path={routes.signin} element={<SignIn/>}/>
                                <Route path={routes.signup} element={<SignUp/>}/>

                                <Route path={"*"} element={<NotFound/>}/>
                                <Route path={"/forbidden"} element={<Forbidden/>}/>
                            </Routes>
                        </Suspense>
                    </Provider>
                </QueryClientProvider>
            </BrowserRouter>
        </>
    )
}

export default App
