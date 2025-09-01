import { useState } from 'react'
import { Button, ThemeToggle, useTheme } from '@tooliv/ui'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const { mode } = useTheme()

  return (
    <div className="app">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid var(--theme-color-border-primary)'
      }}>
        <h1>Tooliv App</h1>
        <ThemeToggle showLabel size="md" />
      </header>
      
      <main style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <p>현재 테마: <strong>{mode === 'light' ? '라이트' : '다크'}</strong></p>
        </div>
        
        <Button>Click me</Button>
        
        <div style={{ marginTop: '2rem' }}>
          <p>카운터: {count}</p>
          <Button onClick={() => setCount(count + 1)}>증가</Button>
        </div>

        {/* MSW API 호출 예시 */}
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--theme-color-border-primary)', borderRadius: '8px' }}>
          <h3>🔴 MSW Mocking Server 테스트</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <Button 
              onClick={async () => {
                setLoading(true)
                try {
                  const response = await fetch('/api/users/me')
                  const userData = await response.json()
                  setUser(userData)
                } catch (error) {
                  console.error('사용자 정보 조회 실패:', error)
                } finally {
                  setLoading(false)
                }
              }}
              disabled={loading}
            >
              {loading ? '로딩 중...' : '사용자 정보 조회'}
            </Button>
            
            {user && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--theme-color-background-secondary)', borderRadius: '4px' }}>
                <h4>사용자 정보:</h4>
                <p><strong>이름:</strong> {user.name}</p>
                <p><strong>사용자명:</strong> {user.username}</p>
                <p><strong>이메일:</strong> {user.email}</p>
              </div>
            )}
          </div>

          <div>
            <Button 
              onClick={async () => {
                setLoading(true)
                try {
                  const response = await fetch('/api/posts?page=1&limit=3')
                  const postsData = await response.json()
                  setPosts(postsData.posts)
                } catch (error) {
                  console.error('게시물 목록 조회 실패:', error)
                } finally {
                  setLoading(false)
                }
              }}
              disabled={loading}
            >
              {loading ? '로딩 중...' : '게시물 목록 조회'}
            </Button>
            
            {posts.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h4>게시물 목록:</h4>
                {posts.map(post => (
                  <div key={post.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--theme-color-background-secondary)', borderRadius: '4px' }}>
                    <h5>{post.title}</h5>
                    <p>{post.content}</p>
                    <small>작성자: {post.author.name} | 좋아요: {post.likes} | 댓글: {post.comments}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
