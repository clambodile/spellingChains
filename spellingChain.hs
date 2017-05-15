import Data.Char
import qualified Data.Map as Map
import System.IO

main = do
  contents <- readFile "dictionary.txt"
  let wordList = words $ map toLower contents
      dictionary = Map.fromList $ zip wordList wordList
  putStr $ unlines $ foldl1 longest $ map (flip spellingChain dictionary) wordList
  
  
spellingChain :: String -> Map.Map String String -> [String]
spellingChain "" _ = []
spellingChain (x:[]) _ = if x `elem` ['a', 'i', 'o'] then [x:""] else []
spellingChain word dict =
  let lChain = spellingChain (init word) dict
      rChain = spellingChain (tail word) dict
      valid = Map.member word dict
  in if valid then word : (longest lChain rChain) else []

longest :: [a] -> [a] -> [a]
longest xs ys = if (length xs) > (length ys) then xs else ys