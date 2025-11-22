import React from 'react';

export default function Contact() {
    return (
        <section className="py-24" id="contact">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 rounded-lg shadow-xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Let's Create Something Together</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Have a project in mind? We'd love to hear about it.
                        </p>
                    </div>
                    <form action="#" method="POST">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input
                                className="w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition"
                                placeholder="Your Name"
                                type="text"
                            />
                            <input
                                className="w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition"
                                placeholder="Your Email"
                                type="email"
                            />
                        </div>
                        <div className="mb-6">
                            <textarea
                                className="w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition"
                                placeholder="Tell us about your project..."
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                type="submit"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
