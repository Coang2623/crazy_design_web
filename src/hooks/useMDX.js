
import { useState, useEffect } from 'react'
import * as runtime from 'react/jsx-runtime'

export const useMDX = (code) => {
    const [Component, setComponent] = useState(null)

    useEffect(() => {
        if (code) {
            const scope = { ...runtime }
            try {
                const fn = new Function(code)
                const result = fn(scope)
                // Ensure the returned default export is a component that accepts props (components map)
                setComponent(() => (props) => result.default({ ...props }))
            } catch (e) {
                console.error('Error executing MDX code:', e)
            }
        }
    }, [code])

    return Component
}
