open Ace_common
open Js_of_ocaml

module Html = Dom_html

let treat_input str =
  try (
    let buffer = Buffer.create 1000 in
    let fmt = Format.formatter_of_buffer buffer in
    let fs = Fs.from_str str in
    let (headers, program) = Fs.main_file fs in
    let exit =
      match Parser_ast.get_header headers "exit" with
      | HNone -> None
      | HString fn ->
        Some (Fs.get_file fn fs |> Exit.load_from_parsed_file)
      | _ -> failwith "Invalid headers."
    in
    main fmt (headers, program) exit ;
    Format.pp_print_flush fmt () ;
    Buffer.contents buffer
  ) with e -> Printexc.to_string e

let is_blank_str s =  
  let rec empty i =
    if i < 0 then true
    else
      let c = String.get s i in
      if c = ' ' || c = '\t' || c = '\n' || c = '\r' then empty (i-1)
      else false
  in
  empty ((String.length s)-1)

let compute _ =
  let main_input =
    Option.get
      (Html.getElementById_coerce "main" Html.CoerceTo.textarea)
  in
  let secondary_input =
    Option.get
      (Html.getElementById_coerce "secondary" Html.CoerceTo.textarea)
  in
  let output =
    Option.get
      (Html.getElementById_coerce "output" Html.CoerceTo.textarea)
  in
  let main_input = Js.to_string main_input##.value in
  let secondary_input = Js.to_string secondary_input##.value in
  let input = main_input^(
    if is_blank_str secondary_input
    then "" else "\n=====\n"^secondary_input
  ) in
  let res = treat_input input in
  output##.value := Js.string res;
  Js._true

let init _ =
  let compute_button =
    Option.get
      (Html.getElementById_coerce "compute" Html.CoerceTo.button)
  in
  compute_button##.onclick := Html.handler compute ;
  Js._false

let _ = Html.window##.onload := Html.handler init
