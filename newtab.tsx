import { useState } from "react"

import "./styles.css"

import MainLayout from "~components/layouts/main"

function IndexNewtab() {
  const questions = [
    {
      q: "Question 1 (answer a)",
      options: {
        a: "options a",
        b: "options b",
        c: "options c",
        d: "options d"
      },
      a: "a"
    },
    {
      q: "Question 2 (answer c)",
      options: {
        a: "options a",
        b: "options b",
        c: "options c",
        d: "options d"
      },
      a: "c"
    },
    {
      q: "Question 3 (answer b)",
      options: {
        a: "options a",
        b: "options b",
        c: "options c",
        d: "options d"
      },
      a: "b"
    },
    {
      q: "Question 4 (answer d)",
      options: {
        a: "options a",
        b: "options b",
        c: "options c",
        d: "options d"
      },
      a: "d"
    }
  ]
  const getRandomIndex = (n: number) => Math.floor(Math.random() * n)

  const [randomQuestion, setRandomQuestion] = useState(
    questions[getRandomIndex(questions.length)]
  )

  const [isCorrect, setIsCorrect] = useState(null)
  const [guess, setGuess] = useState("a")
  const [isloggedIn, setIsloggedIn] = useState(true)

  const checkAnswer = () => {
    if (guess == randomQuestion.a) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsloggedIn(true)
  }
  const handleGithub = () => setIsloggedIn(true)
  const handleGmail = () => setIsloggedIn(true)

  return (
    <>
      {isloggedIn && (
        <MainLayout>
          <div className={"flex flex-col"}>
            <h1>Hello [username]</h1>
            <h2>{randomQuestion.q}</h2>
            <ul>
              {Object.keys(randomQuestion.options).map((o) => (
                <li key={o}>
                  <input
                    type="radio"
                    onChange={(e) => setGuess(e.target.value)}
                    id={o}
                    name="answer"
                    value={o}
                  />
                  <label htmlFor={o}>{randomQuestion.options[o]}</label>
                </li>
              ))}
            </ul>
            <input type="button" value="Check" onClick={checkAnswer} />

            <hr />

            {isCorrect !== null ? (
              isCorrect ? (
                <h3> Good Job </h3>
              ) : (
                <h3>Better luck next time</h3>
              )
            ) : (
              ""
            )}
          </div>
        </MainLayout>
      )}

      {!isloggedIn && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 16
          }}>
          <form action="">
            <div>
              <label onSubmit={handleSubmit} htmlFor="login-email">
                Email
              </label>
              <input type="email" name="email" id="login-email" />
            </div>
            <div>
              <label htmlFor="login-password">Password</label>
              <input type="password" name="password" id="login-password" />
            </div>
            <div>
              <input type="submit" value="Sign in" />
            </div>
          </form>
          <h2>Or login with social account</h2>
          <button onClick={handleGithub}>Github</button>
          <button onClick={handleGmail}>Gmail</button>
        </div>
      )}
    </>
  )
}

export default IndexNewtab
