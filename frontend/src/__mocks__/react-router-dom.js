module.exports = {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => <div>{element}</div>,
    Link: ({ children }) => <a>{children}</a>,
    useParams: jest.fn(),
    useNavigate: jest.fn(),
};
