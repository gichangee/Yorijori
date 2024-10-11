import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostRecipe from "./pages/PostRecipe";
import Recipe from "./pages/Recipe";
import Notfound from "./pages/Notfound/Notfound";
import Main from "./pages/Main/Main";
import Ranking from "./pages/Ranking";
import Header from "./components/Header/Header";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import MyPage from "./pages/MyPage/MyPage";
import Ingredient from "./pages/Ingredient/Ingredient";
import ModifyProfile from "./pages/ModifyProfile/ModifyProfile";
import Login from "./pages/Login/Login";
import LoginLoading from "./pages/Login/LoginLoding";
import Footer from "./components/Footer/Footer";
import SearchRecipe from "./pages/SearchRecipe";
import UserInfo from "./pages/UserInfo/UserInfo";
import ProtectedRoute from "./components/ProtectedRoute"; // 새로 추가된 import

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route
                            path="/post"
                            element={
                                <ProtectedRoute>
                                    <PostRecipe />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/recipe" element={<Recipe />} />
                        <Route path="/recipe/:id" element={<RecipeDetail />} />
                        <Route path="/ranking" element={<Ranking />} />
                        <Route
                            path="/modify"
                            element={
                                <ProtectedRoute>
                                    <ModifyProfile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/mypage"
                            element={
                                <ProtectedRoute>
                                    <MyPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/login-loading"
                            element={<LoginLoading />}
                        />
                        <Route path="/ingredient" element={<Ingredient />} />
                        <Route path="/search" element={<SearchRecipe />} />
                        <Route path="/user/:id" element={<UserInfo />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                    <Footer />
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
