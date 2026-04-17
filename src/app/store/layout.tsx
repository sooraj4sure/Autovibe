// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import CartDrawer from "@/components/cart/CartDrawer";

// export default function StoreLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <Navbar />
//       <CartDrawer />
//       <main className="min-h-screen">{children}</main>
//       <Footer />
//     </>
//   );
// }
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen">{children}</main>
      <Footer />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919582539166?text=Hey%20I%20want%20to%20buy%20some%20products !"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        // style={{ backgroundColor: "#25D366" }}   
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8"
          fill="green"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.495 2.031 7.807L0 32l8.418-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.748-1.839l-.484-.287-5.002 1.194 1.232-4.866-.317-.499A13.24 13.24 0 0 1 2.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.27-9.862c-.398-.199-2.354-1.161-2.719-1.294-.365-.133-.631-.199-.897.199-.266.398-1.029 1.294-1.261 1.56-.232.266-.465.299-.863.1-.398-.199-1.681-.619-3.202-1.977-1.183-1.056-1.981-2.361-2.213-2.759-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.199-.232.266-.398.398-.664.133-.266.066-.499-.033-.698-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.266 0-.698.1-1.063.499-.365.398-1.395 1.362-1.395 3.325s1.428 3.856 1.627 4.122c.199.266 2.811 4.292 6.812 6.021.952.411 1.695.657 2.274.841.955.304 1.824.261 2.511.158.766-.114 2.354-.962 2.686-1.891.332-.929.332-1.726.232-1.891-.1-.166-.365-.266-.763-.465z" />
        </svg>
      </a>
    </>
  );
}