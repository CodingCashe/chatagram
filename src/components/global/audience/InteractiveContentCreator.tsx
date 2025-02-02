import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InteractiveContentCreator() {
  const [pollQuestion, setPollQuestion] = useState("")
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""])
  const [quizQuestion, setQuizQuestion] = useState("")
  const [quizOptions, setQuizOptions] = useState<string[]>(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState("")

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const handleQuizOptionChange = (index: number, value: string) => {
    const newOptions = [...quizOptions]
    newOptions[index] = value
    setQuizOptions(newOptions)
  }

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Interactive Content Creator</h2>
      <Tabs defaultValue="poll" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="poll">Create Poll</TabsTrigger>
          <TabsTrigger value="quiz">Create Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="poll">
          <div className="space-y-4">
            <div>
              <Label htmlFor="poll-question">Poll Question</Label>
              <Input
                id="poll-question"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                className="bg-gray-700 bg-opacity-50 border-none text-white"
              />
            </div>
            {pollOptions.map((option, index) => (
              <div key={index}>
                <Label htmlFor={`poll-option-${index}`}>Option {index + 1}</Label>
                <Input
                  id={`poll-option-${index}`}
                  value={option}
                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  className="bg-gray-700 bg-opacity-50 border-none text-white"
                />
              </div>
            ))}
            <div className="flex space-x-2">
              <Button onClick={() => setPollOptions([...pollOptions, ""])}>Add Option</Button>
              <Button className="bg-[#3352CC] hover:bg-[#2341BB]">Create Poll</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="quiz">
          <div className="space-y-4">
            <div>
              <Label htmlFor="quiz-question">Quiz Question</Label>
              <Input
                id="quiz-question"
                value={quizQuestion}
                onChange={(e) => setQuizQuestion(e.target.value)}
                className="bg-gray-700 bg-opacity-50 border-none text-white"
              />
            </div>
            {quizOptions.map((option, index) => (
              <div key={index}>
                <Label htmlFor={`quiz-option-${index}`}>Option {index + 1}</Label>
                <Input
                  id={`quiz-option-${index}`}
                  value={option}
                  onChange={(e) => handleQuizOptionChange(index, e.target.value)}
                  className="bg-gray-700 bg-opacity-50 border-none text-white"
                />
              </div>
            ))}
            <div>
              <Label htmlFor="correct-answer">Correct Answer</Label>
              <Select onValueChange={setCorrectAnswer}>
                <SelectTrigger className="bg-gray-700 bg-opacity-50 border-none text-white">
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  {quizOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setQuizOptions([...quizOptions, ""])}>Add Option</Button>
              <Button className="bg-[#3352CC] hover:bg-[#2341BB]">Create Quiz</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

