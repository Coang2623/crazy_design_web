import React from 'react';

export default function About() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-800" id="about">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img
                        alt="A modern, minimalist spa reception area with a curved white desk"
                        className="rounded-lg shadow-xl w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnPwzOdRPE3jgjeNds2K6WNWXqW2QQO6pDhinv6qfzNv3ZKp0F1NGVsz62K7Lx1XKnWfcVUjW2B7Pw2xdo_PFw54aZVzSErnLdrIZX5efYX3y4yqAx7MJ37FKbl03yPiH2TWvhNsoe2fDy6xbrxXi5UONbUMxqQ2j0Kgk8IP3PXp96At-YzfY57GiCW44gae5CR9_gusU3Z9Lnt_LFcjDviSJQPmGkyXn_6uk6qAL_pZ1nG7vZpNRdBdmHvEWkVvU6uSfa8StbdEM"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who We Are</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Crazydesign is more than just a design firm; we are storytellers who use space and form as our language. Founded on the principle that great design enhances human experience, we collaborate closely with our clients to create environments that are not only aesthetically pleasing but also functional and enduring.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Our passion lies in the details—the texture of wood, the curve of a chair, the play of light. We believe every element should have a purpose and contribute to a cohesive, inviting atmosphere.
                    </p>
                </div>
            </div>
        </section>
    );
}
