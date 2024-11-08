import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Board } from './src'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Board data={{ positions: { 0: 'xx', 23: 'oo', 5: 'ooooo', 7: 'ooo', 11: 'xxxxx', 12: 'ooooo', 16: 'xxx', 18: 'xxxxx' } }} />
    </StrictMode>,
)