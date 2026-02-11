import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import ScrollProgress from './components/common/ScrollProgress';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/projects/index'));
const ProjectDetail = lazy(() => import('./pages/projects/slug'));
const Blog = lazy(() => import('./pages/blog/index'));
const BlogDetail = lazy(() => import('./pages/blog/slug'));

const NotFound = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24">
        <h1 className="text-8xl font-display font-bold text-primary-500 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found.</p>
        <a href="/" className="text-primary-500 hover:underline">← Back to Home</a>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> },
            { path: 'projects', element: <Projects /> },
            { path: 'projects/:slug', element: <ProjectDetail /> },
            { path: 'blog', element: <Blog /> },
            { path: 'blog/:slug', element: <BlogDetail /> },
            { path: '*', element: <NotFound /> },
        ],
    },
], {
    basename: '/crazy_design_web'
});

function App() {
    return (
        <HelmetProvider>
            <LanguageProvider>
                <ThemeProvider>
                    <Suspense fallback={
                        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
                        </div>
                    }>
                        <ScrollProgress />
                        <RouterProvider router={router} />
                    </Suspense>
                </ThemeProvider>
            </LanguageProvider>
        </HelmetProvider>
    );
}

export default App;
