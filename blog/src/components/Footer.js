const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <>
            <footer class="container-fluid d-flex justify-content-center p-2  mt-auto"            >
                The Blob() blog © {year}
            </footer>
        </>
    )
}

export default Footer