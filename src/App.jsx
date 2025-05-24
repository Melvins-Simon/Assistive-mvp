import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { VoiceRecognitionProvider } from "./context/VoiceRecognitionContext";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SellerDashboardPage from "./pages/SellerDashboardPage";
import CommunityPage from "./pages/CommunityPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import CheckoutPage from "./pages/CheckouPage";
import DonationsPage from "./pages/DonationsPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import AssistiveChatPage from "./pages/HelpPage";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AccessibilityProvider>
          <VoiceRecognitionProvider>
            <Routes>
              {/* Routes without header/footer */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Routes with header/footer */}
              <Route
                element={
                  <>
                    <Header />
                    <main className="flex-grow">
                      <Routes>
                        <Route
                          path="/products"
                          element={<ProductListingPage />}
                        />{" "}
                        <Route path="/donate" element={<DonationsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/account" element={<ProfilePage />} />
                        <Route path="/help" element={<AssistiveChatPage />} />
                        <Route
                          path="/products/:id"
                          element={<ProductDetailPage />}
                        />
                        <Route
                          path="/seller"
                          element={<SellerDashboardPage />}
                        />
                        <Route path="/community" element={<CommunityPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              >
                {/* These routes will inherit the layout */}
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/seller" element={<SellerDashboardPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </VoiceRecognitionProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
