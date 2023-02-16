import Nav from "./Nav"

function Layouot({ children }) {
    return (
        <div className="mx-6 md:max-w-2xl md:mx-auto font-inter">
            <Nav />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layouot