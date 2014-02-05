#!/bin/bash
#
# see http://code.google.com/p/tesseract-ocr/
# see http://www.sk-spell.sk.cx/tesseract-ocr-parameters-in-302-version
#

if [ $# != 1 ]; then
  echo "$0: PDF file is the only argument"
  exit 1
fi

if [ -d $HOME/local/share/tessdata ]
then
  export TESSDATA_PREFIX=$HOME/local/share/
elif [ -d /usr/local/share/tessdata ]
then
  export TESSDATA_PREFIX=/usr/local/share/
else
  echo "$0: no tesseract data exists"
  exit 2
fi

if [ -d $HOME/tmp ]
then
  output_folder="$HOME/tmp"
elif [ -d /tmp ]
then
  output_folder="/tmp"
else
  echo "$0: no tmp directory exists"
  exit 3
fi

filename=$1
base_filename="${filename%.[^.]*}"
basename=`basename $base_filename`
tmp_file_name="$output_folder/output`date +%s`"

#dbg filename="$HOME/public_html/dev/originals/Oregon newspaper reviews.pdf"

echo "Creating image named '$tmp_file_name.png'"
convert -density 300 "$filename" -depth 8 $tmp_file_name.png

count=1
for file in `ls -1 $tmp_file_name*.png | sort -t "-" -n -k2,2`
do
  echo "Converting page $count in $filename to text ($file) ..."
  #tesseract $file "$output_folder/$basename-$count" $HOME/scripts/tesseract.config
  tesseract $file "$output_folder/$basename-$count"
  count=`expr $count + 1`
done
rm $tmp_file_name*.png
cat "$output_folder/$baseame"*.txt > "$base_filename".txt
rm "$output_folder/$basename"*.txt

echo "CREATED $base_filename.txt"
