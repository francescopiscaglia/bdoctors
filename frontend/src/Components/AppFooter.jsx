export default function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="text-white py-4">
                <div className="container d-flex justify-content-center align-items-center">
                    <p style={{ fontSize: '12px' }}>&copy; {currentYear} <span>BDoctor</span>. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}