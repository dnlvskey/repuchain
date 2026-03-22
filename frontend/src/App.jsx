import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d1117', color: '#c9d1d9', fontFamily: 'Courier New, monospace', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #30363d', borderRadius: '8px', padding: '2rem', backgroundColor: '#161b22' }}>
        <h1 style={{ color: '#58a6ff', borderBottom: '1px solid #30363d', paddingBottom: '1rem' }}>RepuChain: Feudal Credit System</h1>
        
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          A multi-weight reputation protocol for autonomous AI agents, built for the <strong>Synthesis Hackathon</strong>.
        </p>

        <h2 style={{ color: '#79c0ff', marginTop: '2rem' }}>Problem Statement</h2>
        <p style={{ lineHeight: '1.6' }}>
          In an emerging agent economy, AI agents lack a deterministic trust layer. Before interacting, negotiating, or delegating tasks, agents need to evaluate peers based on objective, on-chain criteria rather than subjective human reviews.
        </p>

        <h2 style={{ color: '#79c0ff', marginTop: '2rem' }}>Our Solution</h2>
        <p style={{ lineHeight: '1.6' }}>
          RepuChain provides a decentralized protocol evaluating agents on 4 axes: Financial, Execution, Validity, and Social. Scores are updated cryptographically using ERC-8004 receipts to prevent manipulation.
        </p>

        <div style={{ backgroundColor: '#0d1117', border: '1px solid #30363d', padding: '1.5rem', borderRadius: '6px', marginTop: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#58a6ff' }}>Live Deployments</h3>
          <p><strong>Base Sepolia:</strong> <a href="https://sepolia.basescan.org/address/0xd2204DCF4ec59aA5612590b679948c74DC66591d" target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>0xd2204DCF4ec59aA5612590b679948c74DC66591d</a></p>
          <p><strong>Status Network:</strong> <a href="https://sepoliascan.status.network/address/0xCe7F36eDb9b48CAf1A80212DFD11dCe58d9510a0" target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>0xCe7F36eDb9b48CAf1A80212DFD11dCe58d9510a0</a></p>
          <p><strong>GitHub Repo:</strong> <a href="https://github.com/dnlvskey/repuchain" target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>dnlvskey/repuchain</a></p>
        </div>

        <h2 style={{ color: '#79c0ff', marginTop: '2rem' }}>Tech Stack & Details</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Agent Model:</strong> Gemini 3.1 Pro (via Google Antigravity)</li>
          <li><strong>Framework:</strong> OpenClaw</li>
          <li><strong>Tracks:</strong> Protocol Labs (ERC-8004), Base (Agent Services), Status Network (Gasless)</li>
        </ul>

        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #30363d', fontSize: '0.9rem', color: '#8b949e' }}>
          Hackathon Reward Wallet: <code>0x49D1ad89ADB60241Bf2Cc003fe57bcfD4d3cfD95</code>
        </div>
      </div>
    </div>
  )
}

export default App
