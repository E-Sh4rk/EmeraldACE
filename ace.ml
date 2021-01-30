open Arm

let rec first_valid hexs =
  match hexs with
  | [] -> Format.printf "Unwritable\t\t\t" ; None
  | hex::hexs ->
     try (
      let chars = Name.chars_for_command hex in
      Format.printf "%a \t%a\t"
        Name.pp_chars chars
        Arm_printer.pp_hex hex ;
      Some hex
    ) with Name.Unwritable -> first_valid hexs

let treat_command arm =
  let hexs = arm_to_binary arm in
  let res =
    match first_valid hexs with
    | None -> List.hd hexs
    | Some hex -> hex
  in
  Format.printf "%a@." Arm_printer.pp_arm arm ;
  res
  
let auto_exit_code = false

let () =
  (*Printexc.record_backtrace true ;*)
  let exit_codes = Exit.load_from_dir "Files/ExitCodes" in
  let program = Parse.from_filename "test.txt" in
  match program with
  | None -> Format.printf "@.No program to convert. Exiting.@."
  | Some program ->
    let res = program |> List.map treat_command in
    let exit = if auto_exit_code then Some exit_codes else None in
    let boxes_codes = res |>
      List.map Name.codes_for_command |>
      Boxes.fit_codes_into_boxes ~exit
    in
    Format.printf "@.%a@." Boxes.pp_boxes_names boxes_codes
