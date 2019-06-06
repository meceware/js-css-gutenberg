import os
import shutil
import subprocess
import re

# Release folder
dirRelease = '.release'
# Plugin directory
dirPlugin = 'mcw-js-css-gutenberg'

def filterIgnored( ignore ):
  def _ignore_( path, files ):
    return [ f for ig in ignore for f in files if re.search( ig, os.path.join( path, f ).replace( os.sep, '/' ) ) ]
  return _ignore_

# Plugin folders
dirPluginFolders = [
  {
    'folder': 'Licensing',
    'ignore':  None,
  },
  {
    'folder': 'dist',
    'ignore':  shutil.ignore_patterns( 'blocks.style.build.css' ),
  },
]

# Plugin files
dirPluginFiles = [
  'index.php',
  'mcw-js-css-gutenberg.php',
  'README.md',
]

def createArchive( output, dirFolders, dirFiles, version ):
  dirReleasePlugin = os.path.join( dirRelease, output )
  # Create the release folder again
  os.makedirs( dirReleasePlugin )

  # Copy the plugin contents
  for folder in dirFolders:
      shutil.copytree( folder['folder'], os.path.join( dirReleasePlugin, folder[ 'folder' ] ), ignore = folder[ 'ignore' ] )

  # Copy the plugin files
  for files in dirFiles:
    shutil.copyfile( files, os.path.join( dirReleasePlugin, files ) )

  # Copy index.php files
  for path, folders, files in os.walk( dirReleasePlugin, topdown = True ):
    for folder in folders:
      if os.path.isdir( os.path.join( path, folder ) ):
        shutil.copyfile( 'index.php', os.path.join( path, folder, 'index.php' ) )

  # Create the zip file
  shutil.make_archive( os.path.join( dirRelease, output + ( ( '-v' + version.replace( ' ', '-' ) ) if version else '' ) ), 'zip', dirRelease, output )
  # Remove the release directory
  shutil.rmtree( dirReleasePlugin )

  print( 'Archive file is created for ' + output + ' !' )

def getVersion( fileName ):
  with open( fileName, "r" ) as pluginFile:
    for  line in pluginFile:
      matches = re.search( r'\*.*version:?\s?(.*)$', line, re.IGNORECASE )
      if matches:
        return matches.group( 1 )
  return ''

version = getVersion( 'mcw-js-css-gutenberg.php' )

# Build the code
command = 'npm run build'
process = subprocess.Popen( command, shell = True )
process.wait()

createArchive( dirPlugin, dirPluginFolders, dirPluginFiles, version )

exit()
