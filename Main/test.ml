
(* 0x20244ecl *)

let () =
  (* Charset *)
  Settings.lang := Settings.JAP ;
  for i = 0 to 255 do
    for j = 0 to 255 do
      if i <> j && String.equal (Charset.char_at i) (Charset.char_at j)
        && (String.equal (Charset.char_at i) Charset.invalid_char |> not)
      then Format.printf "Similar characters: %i %i@." i j ;
    done
  done ;
  (* Tweaker *)
  Format.printf "Starting...@." ;
  match Optimizer.synthesis_test 5 0xfbc27117l with
  | None -> Format.printf "Fail.@."
  | Some (lst, _) -> Format.printf "Success: %i@." (List.length lst)
