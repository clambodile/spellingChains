import Data.Char
import qualified Data.Set as Set
import System.IO

main = do
  contents <- readFile "dictionary.txt"
  let wordList = words $ map toLower contents
      dictionary = Set.fromList wordList
  putStr $ unlines $ foldl1 longest $ map (flip spellingChain dictionary) wordList
  
  
spellingChain :: String -> Set.Set String -> [String]
spellingChain "" _ = []
spellingChain (x:[]) _ = if x `elem` ['a', 'i', 'o'] then [x:""] else []
spellingChain word dict =
  let lChain = spellingChain (init word) dict
      rChain = spellingChain (tail word) dict
      valid = Set.member word dict
  in if valid then word : (longest lChain rChain) else []

longest :: [a] -> [a] -> [a]
longest xs ys = if (length xs) > (length ys) then xs else ys