import { useEffect, useState } from "react"

import "./styles.css"

import type { User } from "@supabase/supabase-js"

import MainLayout from "~components/layouts/main"
import { supabase } from "~store"
import { AuthSubmitType } from "~types"

function IndexNewtab() {
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState(null)
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

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
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (type: AuthSubmitType) => {
    try {
      const {
        error,
        data: { user, session }
      } =
        type === AuthSubmitType.SIGNIN
          ? await supabase.auth.signInWithPassword({
              email: username,
              password
            })
          : await supabase.auth.signUp({ email: username, password })
      if (error) {
        alert("Error with auth: " + error.message)
      } else if (!user) {
        alert("Signup successful, confirmation mail should be sent soon!")
      }
    } catch (error) {
      console.log("error", error)
      alert(error.error_description || error)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      return
    }
    alert("Goodbye :/")
  }

  return (
    <>
      {session && (
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

          <div>
            <button onClick={signOut}>Sign-out</button>
          </div>
        </MainLayout>
      )}

      {!session && (
        <div
          className={
            "m-auto lg:w-2/6 md:w-2/6 xl:w-1/6 h-screen flex flex-grow items-center"
          }>
          <div
            className={
              " w-full bg-slate-500 h-2/6 flex justify-center items-center flex-col rounded-md"
            }>
            <div className={"flex flex-col justify-start h-2/6 py-2 w-5/6"}>
              <label
                className={
                  "text-lg antialiased uppercase text-slate-200 font-bold"
                }
                htmlFor=" login-email">
                Email
              </label>
              <input
                className={"__input"}
                type="email"
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                id="login-email"
              />
            </div>

            <div
              className={
                "flex flex-col antialiased justify-start h-2/6 py-2 w-5/6"
              }>
              <label
                className={"text-lg font-bold uppercase text-slate-200"}
                htmlFor="login-password">
                Password
              </label>
              <input
                className={"__input"}
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                id="login-password"
              />
            </div>

            <div className={"flex gap-2"}>
              <input
                className={"__btn bg-teal-700 text-slate-100"}
                type="submit"
                value="Sign-in"
                onClick={() => handleSubmit(AuthSubmitType.SIGNIN)}
              />
              <input
                className={"__btn"}
                type="submit"
                value="Sign-up"
                onClick={() => handleSubmit(AuthSubmitType.SIGNUP)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default IndexNewtab
