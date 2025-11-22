import React from 'react';

export default function Work() {
    return (
        <section className="py-24" id="work">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Work</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Explore our curated portfolio showcasing our expertise in creating unique and functional spaces for a diverse range of clients.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden group">
                        <img
                            alt="The exterior of a modern coffee shop with large windows and outdoor seating"
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmOUDjWHIesHv-6obd5xSIouUj_iS40K4Ru-vzbVfp0YTztfeQhiUw7u_WjUZjhZVIi2XF1j1jqnbL_BBhPxGBq0bamDeKvcPRSAxkKweynJfAQb5HzNBOPYceSvuavPNRPSd5hVQgC3UyqmhqSsaeKFpe4DjOBpJ0h1wE09_fMJIsh5mMgpKZhdRWSjzk2EtkcC1kVGIbHjhp-Ve0N9b0LLfeC4uk2t54AwEJU4h1-vfSGVBxuoYSDz09L5zdjUzz66f2ABtJasA"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Coffee Shops</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Inviting atmospheres that brew community and conversation, one custom detail at a time.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden group">
                        <img
                            alt="Minimalist coffee shop interior with light-colored walls and built-in shelving"
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm4uHMJLocUcIoIXRRrQEJNUVaFK4PC9N1nrQveN0-Q4i2Qc9eJ3v8wM1ANhf4tnAbl3urqTm0QcbdXVgEDfBc2vozd049dbamEOduasIfmarzRT_vnZBYPP6XSIDH7jUs87CY04Z5VmhZjlvGM8N6qR2wKeNOKLPzov348gXGY3FqtMhXF8zmY5t6XelCxnP_VxKkXRWpg6HedmIcDIuLtGfovQ0vBSWfJKj_0ifQjD2QIMJWW7QGg8L12K-W1kriu0rGA14AVYI"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Spas & Wellness</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Serene sanctuaries designed for tranquility, relaxation, and rejuvenation.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden group">
                        <img
                            alt="Cozy coffee shop interior with wooden furniture and shelving"
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp1iaEqGsrwGC2Ki_k8X9l0-ix3u4ULD6bm2-zmUd2PqBj736XgAZNDEnS-JJK9PafXcgG-xM5T3Eso2itqQnFjDEpodKaGDcLXdl3wxYmrDc0l-KCJlALRN-w191ocRle3F1TYIFaAehOq1WpU3mr75t8wi-_ILO7v-Ol0qUcYS0jBG_NOUi_E7qodMIxRkyN9oENI9m_p44LXkcALC7Oi3irIBCLCtFIJuGdp_qqpkWIiSoMFc76opkfBqRSnLv_hBnOGz026PQ"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Workshops & Studios</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Functional and inspiring spaces that foster creativity and productivity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
