import Data.Char
import qualified Data.Map as Map
import System.IO

data Dictionary = String

main = do
  contents <- readFile "dictionary.txt"
  let dictionary = map (map toLower) $ words contents
  putStr $ unlines $ spellingChain "hope" dictionary
  
  
spellingChain :: String -> [String] -> [String]
spellingChain "" _ = []
spellingChain (x:[]) _ = if x `elem` ['a', 'i', 'o'] then [x:""] else []
spellingChain word@(x:xs) dict =
  let lChain = spellingChain (init word) dict
      rChain = spellingChain (tail word) dict
      valid = word `elem` dict
  in if valid then word : (longest lChain rChain) else []

longest :: [a] -> [a] -> [a]
longest xs ys = if (length xs) > (length ys) then xs else ys